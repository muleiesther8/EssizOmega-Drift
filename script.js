document.addEventListener("DOMContentLoaded", () => {
  const poems = document.querySelector("#poems");
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle Poems";
  poems.prepend(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    poems.classList.toggle("hidden");
  });
  function renderPoems() {
  const container = document.getElementById("poemsContainer");
  container.innerHTML = "";
  // if poems is a NodeList or DOM element, try to find the global poems array
  const poemsArray = (typeof poems !== 'undefined' && Array.isArray(poems)) ? poems : window.poems || [];
  poemsArray.forEach((poem, index) => {
    const div = document.createElement("div");
    div.className = "poem-item";

    // create poem paragraph safely and preserve newlines
    const poemObj = (typeof poem === 'string') ? { title: '', body: poem, createdAt: new Date().toISOString() } : poem;
    if (poemObj.title) {
      const h3 = document.createElement('h3');
      h3.className = 'poem-title';
      h3.textContent = poemObj.title;
      div.appendChild(h3);
    }
    const dateSpan = document.createElement('div');
    dateSpan.className = 'poem-date';
    if (poemObj.createdAt) {
      dateSpan.textContent = new Date(poemObj.createdAt).toLocaleString();
      div.appendChild(dateSpan);
    }
    const p = document.createElement('p');
    p.className = 'poem-text';
    p.textContent = poemObj.body;
    div.appendChild(p);

    const actions = document.createElement('div');
    actions.className = 'poem-actions';
    actions.innerHTML = `
      <button class="edit-btn" onclick="editPoem(${index})">Edit</button>
      <button class="delete-btn" onclick="deletePoem(${index})">Delete</button>
    `;
    div.appendChild(actions);
    container.appendChild(div);
  });
}
 
  });


