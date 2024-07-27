'use strict';
/* global data */
function checkUrl(str) {
  let url;
  try {
    url = new URL(str);
  } catch {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}
let $image = document.querySelector('img');
if (!$image) throw new Error('$image missing');
console.log('$image: ', $image);
let $photoInput = document.querySelector('input#photo-url-input');
if (!$photoInput) throw new Error('$photoInput missing');
console.log('$photoInput: ', $photoInput);
/*
let badUrl = '
  haha nope
';
let goodUrl = '
  https://www.budgetbytes.com/wp-content/uploads/2020/06/BBQ-Chicken-Pizza-V2.jpg
';
*/
$photoInput.addEventListener('input', function (event) {
  let $eventTarget = event.target;
  if (checkUrl($eventTarget.value)) {
    $image.src = $eventTarget.value;
  } else {
    $image.src = 'images/placeholder-image-square.jpg';
  }
});
