document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('bookingModal');
  const modalContent = modal.querySelector('.modal-content');
  const closeModal = document.getElementById('closeModal');
  const proceedButtons = document.querySelectorAll('.proceed-btn');

  // The original modal HTML with form, stored for reset
  const originalModalHTML = modalContent.innerHTML;

  // Function to reset modal content to original form and re-bind events
  function resetModal() {
    modalContent.innerHTML = originalModalHTML;

    // Re-bind close button event inside modal content
    const closeBtn = modalContent.querySelector('#closeModal');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      resetModal();
    });

    // Bind submit event on form
    const form = modalContent.querySelector('#bookingForm');
    form.addEventListener('submit', handleFormSubmit);
  }

  // Handle form submit event
  function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector('#name').value.trim();
    const contact = form.querySelector('#contact').value.trim();
    const date = form.querySelector('#date').value;
    const eventType = form.querySelector('#event').value.trim();
    const members = form.querySelector('#members').value;
    const theatre = form.getAttribute('data-theatre');

    const message = `Booking Request:
Theatre: ${theatre}
Name: ${name}
Contact: ${contact}
Date: ${date}
Event: ${eventType}
Members: ${members}`;

    const phone = '91XXXXXXXXXX'; // Replace with actual phone
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp link in new tab
    //window.open(whatsappURL, '_blank');

    // Show thank you message inside modal (white screen)
    modalContent.innerHTML = `
      <span class="close" id="closeModal">&times;</span>
      <h3>Thank You!</h3>
      <p>We'll contact you shortly after checking availability.</p>
    `;

    // Bind close event to new close button
    const closeBtn = modalContent.querySelector('#closeModal');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      resetModal();
    });
  }

  // Bind proceed buttons to open modal and set theatre data attribute on form
  proceedButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.add('show');

      // Reset modal content to original every time modal opens
      resetModal();

      // Set the data-theatre attribute on the form inside modal
      const form = modalContent.querySelector('#bookingForm');
      form.setAttribute('data-theatre', button.getAttribute('data-theatre'));
    });
  });

  // Initial close modal event for close button outside form (in original HTML)
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    resetModal();
  });

  // Close modal on clicking outside modal-content area
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      resetModal();
    }
  });
});
