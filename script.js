document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) count++;
    });
    document.getElementById('filter-status').textContent = '正在展示 ' + count + ' 个' + button.textContent;
  });
});
const zoomLinks = document.querySelectorAll('[data-zoom]');
if (zoomLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-label', '作品图片放大预览');
  const close = document.createElement('button');
  close.className = 'dialog-close';
  close.textContent = '关闭 ×';
  const image = document.createElement('img');
  const original = document.createElement('a');
  original.textContent = '打开原图 ↗';
  original.className = 'dialog-original';
  original.target = '_blank';
  original.rel = 'noopener noreferrer';
  dialog.append(close, image, original);
  document.body.append(dialog);
  zoomLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    image.src = link.href;
    original.href = link.href;
    image.alt = link.querySelector('img').alt;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }});
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
}
