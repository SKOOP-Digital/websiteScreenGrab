document.getElementById('screenshotForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = document.getElementById('url').value;
  const delay = document.getElementById('delay').value;
  const width = document.getElementById('width').value;
  const height = document.getElementById('height').value;

  const response = await fetch('/screenshot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, delay, width, height }),
  });

  if (response.ok) {
    const blob = await response.blob();
    const image = document.getElementById('screenshotImage');
    image.src = URL.createObjectURL(blob);
    image.hidden = false;
  } else {
    console.error('Screenshot failed');
  }
});