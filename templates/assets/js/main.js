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



