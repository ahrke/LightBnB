$(() => {

  const $newReservationForm = $(`
  <form action="/api/reservations" method="post" id="new-reservation-form" class="new-property-form">

      <div class="new-property-form__field-wrapper">
        <label for="new-reservation-form__start">Start Date</label>
        <input type="date" name="start" id="new-reservation-form__start" />
      </div>

      <div class="new-property-form__field-wrapper">
        <label for="new-reservation-form__start">End Date</label>
        <input type="date" name="end" id="new-reservation-form__end" />
      </div>

      <div class="new-property-form__field-wrapper">
          <button type='submit'>Reserve</button>
      </div>
        
    </form>
  `);

  window.$newReservationForm = $newReservationForm;

  $newReservationForm.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

    const data = $(this).serialize();
    submitReservation(data)
    .then(() => {
      getAllReservations().then(function( json ) {
        propertyListings.addProperties(json.properties);
        views_manager.show('listings');
      });
    })
    .catch((error) => {
      console.error(error);
      views_manager.show('listings');
    })
  });
});