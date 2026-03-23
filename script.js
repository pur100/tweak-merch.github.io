const COPY_CLASS = 'js-copy';
const COPIED_CLASS = 'is-copied';
const TEXT_COPY_CLASS = 'text-copy';

const getCopyValue = (element) =>
  element.dataset.copyText?.trim() || element.textContent?.trim() || '';

const copyElementContent = async (element) => {
  const value = getCopyValue(element);
  if (!value) return;

  const textCopy = element.querySelector(`.${TEXT_COPY_CLASS}`);
  const originalTextCopyInnerHTML = textCopy.innerHTML;
  if (textCopy) {
    textCopy.innerHTML = 'Copied';
  }
  await navigator.clipboard.writeText(value);

  setTimeout(() => {
    element.classList.remove(COPIED_CLASS);
    element.title = 'Click to copy';
  }, 2000);

  setTimeout(() => {
    if (textCopy.classList.contains(TEXT_COPY_CLASS)) {
      textCopy.innerHTML = originalTextCopyInnerHTML;
    }
  }, 2000);
};

document.querySelectorAll(`.${COPY_CLASS}`).forEach((element) => {
  if (!element.hasAttribute('tabindex')) element.tabIndex = 0;
  element.setAttribute('role', 'button');
  element.title = 'Click to copy';
});

document.addEventListener('click', async (event) => {
  const element = event.target.closest(`.${COPY_CLASS}`);
  if (!element) return;

  console.log(element);
  console.log
  try {
    await copyElementContent(element);
  } catch (error) {
    console.error('Could not copy content:', error);
  }
});

document.addEventListener('keydown', async (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;

  const element = event.target.closest(`.${COPY_CLASS}`);
  if (!element) return;

  event.preventDefault();

  try {
    await copyElementContent(element);
  } catch (error) {
    console.error('Could not copy content:', error);
  }
});
