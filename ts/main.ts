/* global data */

function checkUrl(str: string): boolean {
  let url: URL;

  try {
    url = new URL(str);
  } catch {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

const $image = document.querySelector('img') as HTMLImageElement;
if (!$image) throw new Error('$image missing');
console.log('$image: ', $image);

const $photoInput = document.querySelector(
  'input#photo-url-input',
) as HTMLInputElement;
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

$photoInput.addEventListener('input', function (event: Event) {
  const $eventTarget = event.target as HTMLInputElement;

  if (checkUrl($eventTarget.value)) {
    $image.src = $eventTarget.value;
  } else {
    $image.src = 'images/placeholder-image-square.jpg';
  }
});

// 1:11  error  'data' is defined but never used  @typescript-eslint/no-unused-vars
const false_ = false;
if (false_) console.log(data);
