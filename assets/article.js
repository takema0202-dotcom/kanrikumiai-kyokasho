(function () {
  'use strict';

  try {
    var style = document.createElement('style');
    style.textContent = [
      '.read-time{font-size:.82rem;color:#888;margin:-.5rem 0 1rem}',
      '.toc{background:#f8faff;border:1px solid #d0daf0;border-radius:8px;padding:14px 20px;margin:1rem 0 1.8rem}',
      '.toc-title{font-weight:700;color:#1a4a8a;margin:0 0 8px;font-size:.95rem}',
      '.toc ol{margin:.3rem 0 0;padding-left:1.4em}',
      '.toc li{margin:.3em 0;font-size:.9rem}',
      '.toc a{color:#1a4a8a;text-decoration:none}',
      '.toc a:hover{text-decoration:underline}',
      '.breadcrumb{font-size:.82rem;color:#888;margin:0 0 1rem}',
      '.breadcrumb a{color:#1a4a8a;text-decoration:none}',
      '.breadcrumb a:hover{text-decoration:underline}',
      '.bc-cat{color:#555}',
      '.bc-current{color:#888}',
      '.common-cta{background:#f5f8ff;border:1px solid #d0daf0;border-radius:8px;padding:16px 20px;margin:2rem 0;font-size:.9rem;color:#444}'
    ].join('');
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', function () {
      try {
      var h1 = document.querySelector('h1');
      if (!h1) return;

      var minutes = Math.max(1, Math.ceil((document.body.innerText || '').length / 500));
      var readTime = document.createElement('p');
      readTime.className = 'read-time';
      readTime.textContent = '読了目安：約' + minutes + '分';
      h1.insertAdjacentElement('afterend', readTime);

      var categoryMeta = document.querySelector('meta[name="article-category"]');
      if (categoryMeta && categoryMeta.content) {
        var header = document.querySelector('header');
        var breadcrumb = document.createElement('nav');
        breadcrumb.className = 'breadcrumb';
        breadcrumb.setAttribute('aria-label', 'パンくずリスト');

        var topLink = document.createElement('a');
        topLink.href = '../index.html';
        topLink.textContent = 'トップ';

        var cat = document.createElement('span');
        cat.className = 'bc-cat';
        cat.textContent = categoryMeta.content;

        var current = document.createElement('span');
        current.className = 'bc-current';
        current.textContent = h1.textContent.trim();

        breadcrumb.appendChild(topLink);
        breadcrumb.appendChild(document.createTextNode(' ＞ '));
        breadcrumb.appendChild(cat);
        breadcrumb.appendChild(document.createTextNode(' ＞ '));
        breadcrumb.appendChild(current);

        if (header) {
          header.insertAdjacentElement('afterend', breadcrumb);
        } else {
          h1.insertAdjacentElement('beforebegin', breadcrumb);
        }
      }

      var excluded = /^(結論|まとめ|関連記事|PR|相談)/;
      var headings = Array.prototype.slice.call(document.querySelectorAll('h2')).filter(function (heading) {
        return !excluded.test(heading.textContent.trim());
      });

      if (headings.length >= 2) {
        var toc = document.createElement('nav');
        toc.className = 'toc';
        toc.setAttribute('aria-label', '目次');

        var title = document.createElement('p');
        title.className = 'toc-title';
        title.textContent = 'この記事の目次';
        toc.appendChild(title);

        var list = document.createElement('ol');
        headings.forEach(function (heading, index) {
          var id = heading.id || 'section-' + (index + 1);
          heading.id = id;

          var item = document.createElement('li');
          var link = document.createElement('a');
          link.href = '#' + id;
          link.textContent = heading.textContent.trim();
          item.appendChild(link);
          list.appendChild(item);
        });
        toc.appendChild(list);

        var conclusion = document.querySelector('.conclusion');
        if (conclusion) {
          conclusion.insertAdjacentElement('beforebegin', toc);
        } else {
          readTime.insertAdjacentElement('afterend', toc);
        }
      }

      if (!document.querySelector('.pr-box')) {
        var cta = document.createElement('div');
        cta.className = 'common-cta';
        cta.innerHTML = '<p>管理組合の運営でお困りの場合は、マンション管理士への相談も選択肢のひとつです。複数のサービスを比較して、自分たちの状況に合った支援を検討してください。</p>';

        var footer = document.querySelector('footer');
        if (footer) {
          footer.insertAdjacentElement('beforebegin', cta);
        } else {
          document.body.appendChild(cta);
        }
      }
      } catch (error) {
        if (window.console && console.warn) {
          console.warn('article.js skipped:', error);
        }
      }
    });
  } catch (error) {
    if (window.console && console.warn) {
      console.warn('article.js skipped:', error);
    }
  }
})();
