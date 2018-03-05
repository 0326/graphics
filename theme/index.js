import './css/index.scss'

import articles from './article'

const $asideMenu = $('#J_AsideMenu')
const $article = $('#J_Article')

function renderAsideMenu() {
  let tpl = ''
  articles.forEach((obj) => {
    tpl += `<p class="menu-label">${obj.label}</p>`
    let lis = ''
    obj.list.forEach((item) => {
      lis += `<li><a>${item.title}</a></li>`
    })
    tpl += `<ul class="menu-list">${lis}</ul>`
  })
  $asideMenu.append(tpl)
}

renderAsideMenu()
$article.html(articles[0].list[0].templ)

