const showPostModal = (post) => {
  const dialog = document.getElementById("post-modal");

  document.getElementById("modal-title").textContent = post.title;

  // Set status select value and styling
  const statusSelect = document.getElementById("modal-status-select");
  statusSelect.dataset.postId = post.id;
  statusSelect.value = post.status;
  statusSelect.classList.remove(
    "status-published",
    "status-draft",
    "status-archived",
  );
  statusSelect.classList.add(`status-${post.status}`);
  statusSelect.dataset.previousStatus = post.status;

  // TODO: Uncomment when image upload is implemented
  // Image - show only if exists and is not empty
  // const imageContainer = document.getElementById("modal-image-container");
  // const imageElement = document.getElementById("modal-image");
  //
  // if (post.image && post.image.trim() !== "") {
  //   imageElement.src = post.image;
  //   imageElement.alt = post.title;
  //   imageContainer.classList.add("show");
  // } else {
  //   imageContainer.classList.remove("show");
  // }

  document.getElementById("modal-author").textContent = post.author;
  document.getElementById("modal-created").textContent = new Date(
    post.createdAt,
  ).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  document.getElementById("modal-id").textContent = post.id;

  document.getElementById("modal-teaser").textContent = post.teaser;
  document.getElementById("modal-content").innerHTML = post.content;

  if (dialog.open) {
    dialog.close();
  } else {
    dialog.showModal();
  }
};

const deletePostFromTable = async (postId, buttonElement) => {
  if (!confirm("Are you sure you want to delete this post?")) {
    return;
  }

  try {
    const response = await fetch(`/admin/post/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Remove the row from the DOM
    const row = buttonElement.closest("tr");
    row.style.transition = "opacity 0.3s ease-out";
    row.style.opacity = "0";

    setTimeout(() => {
      row.remove();
    }, 300);
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete post. Please try again.");
  }
};

const updateSelectStatus = (selectElement, status) => {
  selectElement.value = status;
  selectElement.classList.remove(
    "status-published",
    "status-draft",
    "status-archived",
  );
  selectElement.classList.add(`status-${status}`);
  selectElement.dataset.previousStatus = status;
};

const updatePostStatusFromTable = async (postId, selectElement) => {
  const newStatus = selectElement.value;
  const oldStatus = selectElement.dataset.previousStatus || newStatus;

  updateSelectStatus(selectElement, newStatus);

  try {
    const response = await fetch(`/admin/post/${postId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update status`);
    }

    const modalSelect = document.getElementById("modal-status-select");
    if (modalSelect && modalSelect.dataset.postId === postId) {
      updateSelectStatus(modalSelect, newStatus);
    }

    document
      .querySelectorAll(".admin-table .status-select")
      .forEach((tableSelect) => {
        const row = tableSelect.closest("tr");
        if (
          row &&
          row.querySelector(`button[onclick*="${postId}"]`) &&
          tableSelect !== selectElement
        ) {
          updateSelectStatus(tableSelect, newStatus);
        }
      });
  } catch (error) {
    console.error(error);
    alert("Failed to update status. Please try again.");
    updateSelectStatus(selectElement, oldStatus);
  }
};

const updatePostStatusFromModal = updatePostStatusFromTable;

const openCreatePostModal = () => {
  const dialog = document.getElementById("create-post-modal");
  const form = document.getElementById("create-post-form");

  // Reset form
  form.reset();

  dialog.showModal();
};

const handleCreatePost = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const postData = {
    title: formData.get("title"),
    author: formData.get("author"),
    teaser: formData.get("teaser"),
    content: formData.get("content"),
  };

  try {
    const response = await fetch("/admin/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post`);
    }

    const newPost = await response.json();

    // Close modal and reset form
    document.getElementById("create-post-modal").close();
    form.reset();

    // Reload the page to show the new post
    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Failed to create post. Please try again.");
  }
};
