document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('bookingModal');
  const modalContent = modal.querySelector('.modal-content');
  const closeModal = document.getElementById('closeModal');
  const proceedButtons = document.querySelectorAll('.proceed-btn');

  const originalModalHTML = modalContent.innerHTML;

  function resetModal() {
    modalContent.innerHTML = originalModalHTML;

    const closeBtn = modalContent.querySelector('#closeModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        resetModal();
      });
    }

    const form = modalContent.querySelector('#bookingForm');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;

    // Set theatre from data attribute into hidden input
    const theatreInput = form.querySelector('#theatre');
    theatreInput.value = form.getAttribute('data-theatre') || 'Not specified';

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        modalContent.innerHTML = `
          <span class="close" id="closeModal">&times;</span>
          <h3>Thank You!</h3>
          <p>Your booking has been submitted. We'll contact you soon.</p>
        `;

        const closeBtn = modalContent.querySelector('#closeModal');
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('show');
          resetModal();
        });
      } else {
        alert("Submission failed. Please try again.");
        console.error(result);
      }
    })
    .catch(error => {
      alert("Error submitting form.");
      console.error(error);
    });
  }

  proceedButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.add('show');
      resetModal();

      const form = modalContent.querySelector('#bookingForm');
      if (form) {
        form.setAttribute('data-theatre', button.getAttribute('data-theatre'));
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      resetModal();
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      resetModal();
    }
  });

  resetModal();
});
