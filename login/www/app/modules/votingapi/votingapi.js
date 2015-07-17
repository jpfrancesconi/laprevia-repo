/**
 * The select_votes service resource.
 */
function votingapi_select_votes(options) {
  try {
    options.method = 'POST';
    options.path = 'votingapi/select_votes.json';
    options.service = 'votingapi';
    options.resource = 'select_votes';
    if (typeof options.data === 'object') { options.data = JSON.stringify(options.data); }
    Drupal.services.call(options);
  }
  catch (error) { console.log('votingapi_select_votes - ' + error); }
}

/**
 * The set_votes service resource.
 *   options.data.votes[0].entity_type  (Optional, defaults to 'node')
 *   options.data.votes[0].entity_id    (Required)
 *   options.data.votes[0].value_type    (Optional, defaults to 'percent')
 *   options.data.votes[0].value         (Required)
 *   options.data.votes[0].tag           (Optional, defaults to 'vote')
 *   options.data.votes[0].uid           (Optional, defaults to current user)
 *   options.data.votes[0].vote_source   (Optional, defaults to current IP)
 *   options.data.votes[0].timestamp     (Optional, defaults to REQUEST_TIME)
 */
function votingapi_set_votes(options) {
  try {
    options.method = 'POST';
    options.path = 'votingapi/set_votes.json';
    options.service = 'votingapi';
    options.resource = 'set_votes';
    if (typeof options.data === 'object') { options.data = JSON.stringify(options.data); }
    Drupal.services.call(options);
  }
  catch (error) { console.log('votingapi_set_votes - ' + error); }
}

/**
 * The set_votes service resource.
 *   options.data.votes[0].entity_type    (Required)
 *   options.data.votes[0].entity_id    (Required)
 *   options.data.votes[0].tag    (Required)
 */
function votingapi_delete_votes(options) {
  try {
    options.method = 'POST';
    options.path = 'votingapi/delete_votes.json';
    options.service = 'votingapi';
    options.resource = 'delete_votes';
    if (typeof options.data === 'object') { options.data = JSON.stringify(options.data); }
    Drupal.services.call(options);
  }
  catch (error) { console.log('votingapi_delete_votes - ' + error); }
}