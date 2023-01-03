/**
 * Print the display name if available for 10 connections.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
 function listConnectionNames(auth) {
  const service = google.people({version: 'v1', auth});
  service.people.connections.list({
    resourceName: 'people/me',
    pageSize: 2,
    personFields: 'names,emailAddresses',
  }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    const connections = res.data.connections;
    if (connections) {
      console.log('Connections:');
      connections.forEach((person) => {
        if (person.names && person.names.length > 0) {
          console.log(person.names[0].displayName);
        } else {
          console.log('No display name found for connection.');
        }
      });
    } else {
      console.log('No connections found.');
    }
  });
  // https://developers.google.com/people/api/rest/v1/people/createContact
  service.people.createContact({
    requestBody: {
      emailAddresses: [{value: 'test@test.com'}],
      names: [
        {
          displayName: 'A',
          familyName: 'B',
          givenName: 'C',
        },
      ],
    },
  });
  //console.log('\n\nCreated Contact:', newContact);

}