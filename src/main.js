const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
console.log('x')
console.log(x)
const xObject = JSON.parse(x)
console.log('x')
console.log(x)
const hashMap = xObject || [
    {
        logo: 'A',
        url:'https://www.acfun.cn'
    },
    {
        logo:'B', 
        url:'https://bilibili.com'
    },
    {
        logo: 'D',
        url: 'https://douban.com'
    },
];

const simplifyUrl = (url) => {
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //删除/开头的内容，简化url
}

const render =() =>{
    $siteList.find('li:not(.last').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            console.log('这里')
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index)
            render()
        })
    })
}


render()

$('.addButton').on('click',()=>{
        let url = window.prompt('请输入您要添加的网址：');
        if(url.indexOf('http')!==0){
            url = 'https://' + url;
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url:url,
        })
    render()
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})