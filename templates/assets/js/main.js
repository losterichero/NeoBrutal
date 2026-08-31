// 明暗主题切换图标：亮色显示月亮（点击切暗色），暗色显示太阳（点击切回亮色）
function updateThemeIcons() {
  var isDark = document.documentElement.classList.contains('dark');
  $('.theme-switch i').each(function () {
    $(this).toggleClass('bi-sun-fill', isDark).toggleClass('bi-moon-stars-fill', !isDark);
  });
}

// 变黑函数
function setDark() {
  localStorage.setItem("isDarkMode", "1");
  document.documentElement.classList.add("dark");
  updateThemeIcons();
}
// 变白函数
function removeDark() {
  localStorage.setItem("isDarkMode", "0");
  document.documentElement.classList.remove("dark");
  updateThemeIcons();
}
// switch按钮
function switchDarkMode() {
  let isDark = localStorage.getItem("isDarkMode");
  if (isDark == '1') {
    removeDark();
  } else {
    setDark();
  }
}

// 获取dom元素
function $ge(ele, all = false){
  return all ? document.querySelectorAll(`${ele}`) : document.querySelector(`${ele}`)
}

//到某个高度后，给某个div加class
$(window).scroll(function () {
  if ($(window).scrollTop() > 900) {
    $('.headbox').addClass('fixednav')
    $('.headbox').addClass('header-sticky')
  }
  else {
    $('.headbox').removeClass('fixednav')
    $('.headbox').removeClass('header-sticky')
  }
});



//table预设calss
$('.meapost table').addClass("table");

const isDark= localStorage.getItem("isDarkMode");
if(isDark==="1"){
  document.documentElement.classList.add('dark');
}else{
  document.documentElement.classList.remove('dark');
}
updateThemeIcons();

// 返回顶部
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
const rootElement = document.documentElement;

function handleScroll() {
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  // 计算整屏的高度
  const oneScreenHeight = rootElement.clientHeight;

  if (rootElement.scrollTop > oneScreenHeight) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

// 滚动进度条
const scrollProgress = document.querySelector(".scroll-progress");
function updateScrollProgress() {
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  const scrolled = rootElement.scrollTop;
  if (scrollProgress) {
    scrollProgress.style.width =
      scrollTotal > 0 ? (scrolled / scrollTotal) * 100 + "%" : "0%";
  }
}
document.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();



//锚点
$(function () {
  $('a[href^="#"]').click(function () {
    var speed = 10;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

$(function () {
  $(".meapost").find("a").attr("target", "_blank");
});
$(function () {
  beiciAll();
});
function getFirstCharacter(title) {
  // 去除字符串中的非字母、非汉字字符
  title = title.replace(/[^\u4e00-\u9fa5a-zA-Z]/gu, '');

  // 使用正则表达式匹配标题中的第一个汉字或字母
  var matches = title.match(/^[\u4e00-\u9fa5a-zA-Z]/u);

  // 如果匹配到，则返回第一个匹配项
  if (matches !== null && matches.length > 0) {
      var firstCharacter = matches[0];
      if (firstCharacter.toLowerCase() === firstCharacter) {
          firstCharacter = firstCharacter.toUpperCase();
      }
      return firstCharacter;
  }

  // 如果没有匹配到字母，则返回下一个字母
  matches = title.match(/[a-zA-Z]/);

  // 如果匹配到字母，则返回第一个匹配项
  if (matches !== null && matches.length > 0) {
      var firstCharacter = matches[0];
      if (firstCharacter.toLowerCase() === firstCharacter) {
          firstCharacter = firstCharacter.toUpperCase();
      }
      return firstCharacter;
  }

  // 如果都没有匹配到，则返回默认值，可以根据需求修改
  return 'M';
}
function beiciAll(){
  $(".beici, .post_beici, post_beici").each(function() {
    var beici = $(this).data("text");
    var beici_f = getFirstCharacter(beici);
    $(this).text(beici_f);
  });
}

// 侧边栏折叠菜单（手风琴）
$(function () {
  $(document).on('click', '.sider-collapse-title', function () {
    var $item = $(this).closest('.sider-collapse-item');
    var $content = $item.children('.sider-collapse-content');
    var $collapse = $item.closest('.sider-collapse');
    if ($collapse.is('[data-accordion]')) {
      $collapse.find('.sider-collapse-item.open').not($item)
        .removeClass('open')
        .children('.sider-collapse-content').slideUp(200);
    }
    $item.toggleClass('open');
    $content.slideToggle(200);
  });
});

// 桌面下拉菜单：子菜单超出视口右缘时改为右对齐，避免被裁掉/错位
$(function () {
  $(document).on('mouseenter', '.header-menu .menu-item-has-children', function () {
    var $sub = $(this).children('.sub-menu');
    if (!$sub.length) return;
    var rect = $sub[0].getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) {
      $sub.css({ left: 'auto', right: '0' });
    } else {
      $sub.css({ left: '', right: '' });
    }
  });
});

// 侧边栏展开/收起时给菜单项加/减入场动画（配合 neo-brutalism.css 21.8 的堆叠抽出）
$(function () {
  var $canvas = $('#right-canvas');
  $canvas.on('shown.bs.offcanvas', function () {
    $(this).find('.sidebar_box').addClass('anim-in');
  });
  $canvas.on('hidden.bs.offcanvas', function () {
    $(this).find('.sidebar_box').removeClass('anim-in');
  });
});

// ===== 文章详情页：正文目录（PC 右侧 / 移动端抽屉） =====
$(function () {
  var $article = $('.post-markdown-style');
  if (!$article.length) return;

  var HEADER_OFFSET = 88;
  var TOC_TOP = 175; // 目录距离视口顶部
  var tocCounter = 0;
  var $drawer = $('#postTocDrawer');
  var $mask = $('#postTocMask');
  var $toggle = $('#postTocToggle');

  // ---- 构建目录树（h1~h6 按层级嵌套，无 id 则补一个）----
  function buildToc() {
    var headings = $article.find('h1, h2, h3, h4, h5, h6');
    if (!headings.length) return;

    var $root = $('<ol class="post-toc-list"></ol>');
    var stack = [{ level: 0, $ol: $root }];

    headings.each(function () {
      var $h = $(this);
      var level = parseInt(this.tagName.charAt(1), 10);
      var id = this.id;
      if (!id) {
        id = 'toc-' + (++tocCounter);
        this.id = id;
      }

      var $a = $('<a></a>').attr('href', '#' + id).text($h.text().trim());
      var $li = $('<li></li>').append($a);

      while (stack.length > 1 && level <= stack[stack.length - 1].level) {
        stack.pop();
      }
      var top = stack[stack.length - 1];
      top.$ol.append($li);
      if (level > top.level) {
        var $sub = $('<ol></ol>');
        $li.append($sub);
        stack.push({ level: level, $ol: $sub });
      }
    });

    $('.post-toc .post-toc-list, .post-toc-drawer .post-toc-list').html($root.html());
  }

  // ---- 移动端抽屉开关 ----
  function closeDrawer() {
    if (!$drawer.length) return;
    $drawer.removeClass('open');
    if ($mask.length) $mask.prop('hidden', true);
  }
  if ($toggle.length) {
    $toggle.on('click', function () {
      $drawer.toggleClass('open');
      if ($mask.length) $mask.prop('hidden', !$drawer.hasClass('open'));
    });
    $('.post-toc-close').on('click', closeDrawer);
    $mask.on('click', closeDrawer);
  }

  // ---- 目录点击：平滑滚动（带 header 偏移）+ 收起抽屉 ----
  //   用 getElementById 按 id 精确找标题：Halo 生成的标题 id 形如 "3.-验证"（数字开头、含点号），
  //   直接 $(href) 作选择器会解析为空集，导致既不滚动也不收起抽屉。
  $(document).on('click', '.post-toc-list a', function (e) {
    var href = $(this).attr('href');
    if (!href || href === '#') return;
    var id = href.replace(/^#/, '');
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    $('html, body').animate({ scrollTop: $(el).offset().top - HEADER_OFFSET }, 400);
    closeDrawer();
  });

  // ---- PC 固定定位：嵌在文章块右缘、向右侧空白区域延伸 ----
  var $toc = $('#postToc');
  var tocWasHidden = true; // 目录从隐藏转为可见时播放入场动画
  function positionToc() {
    if (!$toc.length) return;
    if (getComputedStyle($toc[0]).display === 'none') return; // 移动端走抽屉
    var $box = $('.post-box');
    if (!$box.length) return;
    var vw = window.innerWidth;
    var box = $box[0].getBoundingClientRect();
    var tocW = $toc.outerWidth() || 200;
    // 左缘压在文章块右缘内 24px；窄屏钳制在视口内，避免越界
    var left = Math.max(12, Math.min(box.right - 24, vw - tocW - 12));
    var boxTop = box.top;
    var boxBottom = box.bottom;
    var tocH = $toc.outerHeight() || 100;
    // 文章块还没滚到锚点区、或已滚出底部 → 隐藏目录
    if (boxBottom < TOC_TOP || boxTop > TOC_TOP + tocH) {
      $toc.css('visibility', 'hidden');
      tocWasHidden = true;
      return;
    }
    $toc.css({ left: left + 'px', top: Math.max(16, Math.min(TOC_TOP, boxBottom - tocH - 12)) + 'px', visibility: 'visible' });
    // 每次由隐藏转为可见都重播入场动画（visibility 切换不会自动重放 CSS 动画）
    if (tocWasHidden) {
      $toc.removeClass('anim-in');
      void $toc[0].offsetWidth; // 强制回流以重新触发动画
      $toc.addClass('anim-in');
      tocWasHidden = false;
    }
  }
  $(window).on('resize', positionToc);
  $(window).on('scroll', function () {
    if (window.requestAnimationFrame) {
      requestAnimationFrame(positionToc);
    } else {
      positionToc();
    }
  });
  positionToc();

  // ---- 滚动高亮当前章节 ----
  function updateActive() {
    var $headings = $article.find('h1, h2, h3, h4, h5, h6');
    if (!$headings.length) return;
    var pos = $(window).scrollTop() + HEADER_OFFSET + 10;
    var current = null;
    $headings.each(function () {
      if ($(this).offset().top <= pos) current = this.id;
    });
    $('.post-toc-list a').each(function () {
      var $a = $(this);
      $a.toggleClass('is-active', $a.attr('href') === '#' + current);
    });
  }
  $(window).on('scroll', function () {
    if (window.requestAnimationFrame) {
      requestAnimationFrame(updateActive);
    } else {
      updateActive();
    }
  });
  updateActive();

  buildToc();
});

// ===== 全站：返回顶部按钮 / 点赞条贴文章主体块（返回顶部贴右缘外侧、点赞条贴左缘外侧）。
//   评论区顶部从屏幕底部进入后，点赞条改为贴评论区上方、随页面一起滚动（PC 与移动端一致），
//   但上移到顶部导航栏时停止，保持在其下方；footer 顶部进入屏幕后，返回顶部按钮改为贴 footer 上方、随页面滚动。 =====
$(function () {
  var $bar = $('#postActionBar');
  var $top = $('.scrollToTopBtn');
  var $comment = $('.post-comment');
  var $footer = $('.footer');
  var $header = $('.headbox');
  if (!$bar.length && !$top.length) return;

  var BAR_GAP = 12;      // 点赞条底部与评论区顶部的间距
  var HEADER_GAP = 12;   // 点赞条顶部与导航栏底边的间距（碰到导航栏后停在此处）
  var FOOTER_GAP = 12;   // 返回顶部按钮底部与 footer 顶部的间距

  function getScrollTop() {
    return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body).scrollTop;
  }

  function positionFloats() {
    var vw = window.innerWidth;
    var mobile = vw < 1200;
    var $box = $('.post-box');
    var b = ($box.length && !mobile) ? $box[0].getBoundingClientRect() : null;
    var barLeft = '';
    var topRight = '';

    if (b) {
      if ($bar.length) {
        var bw = $bar.outerWidth() || 56;
        barLeft = Math.max(12, Math.round(b.left - bw - 16)) + 'px'; // 贴文章块左缘外侧
      }
      if ($top.length) {
        var tw = $top.outerWidth() || 48;
        topRight = Math.max(12, Math.round(vw - (b.right + 16 + tw))) + 'px'; // 返回顶部贴文章块右缘外侧
      }
    }

    // 点赞条：评论区顶部进入屏幕 → 条保持在评论区上方、随页面滚动；否则贴底固定
    if ($bar.length) {
      var barBottom = mobile ? 0 : 24;
      var barH = $bar.outerHeight() || 120;
      var stick = true;
      if ($comment.length) {
        var commentTopView = $comment[0].getBoundingClientRect().top;
        if (commentTopView <= window.innerHeight - barBottom + 4) {
          stick = false; // 评论区开始从屏幕底部出现 → 随页面滚动
        }
      }
      if (!stick) {
        var absTop = Math.round($comment.offset().top - BAR_GAP - barH - getScrollTop());
        // 上移到顶部导航栏（粘性）下方即停，不再继续往上滚
        if ($header.length) {
          var headerBottom = $header[0].getBoundingClientRect().bottom;
          var minTop = Math.round(headerBottom + HEADER_GAP);
          if (absTop < minTop) absTop = minTop;
        }
        $bar.css({ position: 'fixed', top: absTop + 'px', bottom: 'auto', left: mobile ? '0px' : barLeft, visibility: 'visible' });
      } else {
        $bar.css({ position: 'fixed', top: 'auto', bottom: (mobile ? '0px' : '24px'), left: mobile ? '' : barLeft, visibility: 'visible' });
      }
      if (!$bar.hasClass('anim-in')) $bar.addClass('anim-in');
    }

    // 返回顶部：footer 顶部进入屏幕 → 按钮保持在 footer 上方、随页面滚动（随滚动逐帧改 top，关闭过渡避免拖尾）
    if ($top.length) {
      if ($footer.length) {
        var topH = $top.outerHeight() || 48;
        var footerTopView = $footer[0].getBoundingClientRect().top;
        if (footerTopView <= window.innerHeight - 30 + 4) {
          var topAbsTop = Math.round($footer.offset().top - FOOTER_GAP - topH - getScrollTop());
          $top.css({ right: topRight || '', top: topAbsTop + 'px', bottom: 'auto', transition: 'none' });
        } else {
          $top.css({ right: topRight || '', top: 'auto', bottom: '30px', transition: '' });
        }
      } else {
        $top.css({ right: topRight || '' });
      }
    }
  }
  $(window).on('resize', positionFloats);
  $(window).on('scroll', function () {
    if (window.requestAnimationFrame) { requestAnimationFrame(positionFloats); } else { positionFloats(); }
  });
  positionFloats();
});

// ===== 文章详情页：左下角竖排图标条（点赞 / 评论），由 CSS 固定定位，无 JS 重定位 =====
$(function () {
  var $bar = $('#postActionBar');
  var $likeBtn = $('.post-like-btn');
  var $commentBtn = $('.post-comment-btn');
  if (!$bar.length || (!$likeBtn.length && !$commentBtn.length)) return;

  var HEADER_OFFSET = 88;
  var LS_KEY = 'brevityBook.upvoted.posts';

  if ($likeBtn.length) {
    var postName = $likeBtn.attr('data-post-name') || '';
    // 点赞接口地址由模板渲染（@{...} 带上下文路径，站部署在子目录也能用），失败时回退到根路径
    var upvoteUrl = $likeBtn.attr('data-upvote-url') || '/apis/api.halo.run/v1alpha1/trackers/upvote';
    var voted = [];
    try { voted = JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch (e) { voted = []; }
    var markLiked = function () {
      $likeBtn.addClass('liked');
      var $ic = $likeBtn.find('i');
      if ($ic.hasClass('bi-hand-thumbs-up')) {
        $ic.removeClass('bi-hand-thumbs-up').addClass('bi-hand-thumbs-up-fill');
      }
    };
    if (postName && voted.indexOf(postName) !== -1) markLiked();

    $likeBtn.on('click', function () {
      var name = $likeBtn.attr('data-post-name') || '';
      if (!name || $likeBtn.hasClass('liked')) return;
      fetch(upvoteUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group: 'content.halo.run', plural: 'posts', name: name })
      }).then(function (res) {
        if (!res.ok) return;
        markLiked();
        // 点赞成功 → 徽标数字 +1（接口返回空体，本地累加）
        var $badge = $likeBtn.find('.post-like-badge');
        if ($badge.length) {
          var n = parseInt($badge.text(), 10);
          if (!isNaN(n)) $badge.text(n + 1);
        }
        voted.push(name);
        try { localStorage.setItem(LS_KEY, JSON.stringify(voted)); } catch (e) {}
      }).catch(function () {});
    });
  }

  if ($commentBtn.length) {
    $commentBtn.on('click', function () {
      var $target = $('.post-comment');
      if (!$target.length) return;
      $('html, body').animate({ scrollTop: $target.offset().top - HEADER_OFFSET }, 400);
    });
  }
});



