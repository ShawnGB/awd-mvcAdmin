const showPostModal = (post) => {
  const dialog = document.getElementById("post-modal");

  document.getElementById("modal-title").textContent = post.title;

  const statusBadge = document.getElementById("modal-status-badge");
  statusBadge.textContent = post.status.toUpperCase();
  statusBadge.className = "badge";

  if (post.status === "published") {
    statusBadge.classList.add("badge-success");
  } else if (post.status === "draft") {
    statusBadge.classList.add("badge-warning");
  } else if (post.status === "archived") {
    statusBadge.classList.add("badge-error");
  }

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
