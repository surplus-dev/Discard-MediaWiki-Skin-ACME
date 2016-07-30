# acme
키위위키 기본 스킨(Thanks for https://wsilog.xyz 2DU)

# 설치법

미디어위키/skins/ 에 acme란 이름으로 파일을 풀고 로컬 셋에

```php
	require_once "$IP/skins/acme/acme.php";
```
를 넣으세요.

만약 기본 스킨으로 하려면

```php
	$wgDefaultSkin = "acme";
```
도 넣으세요.

# 다크테마
다크테마로 만들려면 "미디어위키:Common.css"에

```css
body {
    background: black;
    color: white;
}
.navbar-default .navbar-collapse, .navbar-default .navbar-form {
    border-color: black;
    background: black;
}
.head-section .navbar-default {
    background-color: black;
}
.head-section .nav li a, .head-section .nav li.active ul.dropdown-menu li a {
    color: white;
}
.head-section {
    border-bottom: 1px solid #000;
}
legend {
    color: white;
}
#toc {
    background: black;
    color: white;
}
#wpTextbox1 {
    background: black;
    color: white;
}
.mw-warning-with-logexcerpt.mw-content-ltr {
    color: black;
}
.dropdown-menu {
    background-color: black;
}
.live-recent ul li a {
    color: white;
}
.live-recent {
    background: black;
}
#live-recent-list li a {
    color: white;
}
pre, .mw-highlight pre {
    color: white;
    background-color: black;
}
#wpSummary {
    background: black;
}
table.wikitable {
    background-color: black;
    color: white;
}
.toccolours {
    background-color: black;
}
.editButtons input {
    background: black;
    color: white;
}
.wikiEditor-preview-contents {
    background-color: black;
}
#tagfilter {
    background: black;
    color: white;
}
input {
    background: black;
    color: white;
}
.oo-ui-dropdownWidget-handle {
    color: black;
}
#pagehistory li.selected {
    background-color: #3C3C3C;
}
.mw-warning-with-logexcerpt.mw-content-ltr {
    color: white;
}
#wpUploadDescription {
    background: black;
    color: white;
}
.mw-htmlform-submit {
    background: black;
}
blockquote {
    background: black;
}
s:hover, strike:hover, del:hover {
    color: #9E9E9E;
    background-color: #212020;
}
s, strike, del {
    color: #9E9E9E;
}
table.wikitable > tr > th, table.wikitable > * > tr > th {
    background-color: black;
}
```
를 추가하세요
