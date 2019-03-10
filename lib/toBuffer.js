/**
 * Creates a transform stream that will convert items to Buffer if they are not
 *
 * @returns {object}
 *  The stream created
 */
const isString = require( 'lodash/isString' );

function createToBufferStream(){

  function transform( item, _, next ){

    const buffer = Buffer.isBuffer( item )
      ? item
      : isString( item ) ? Buffer.from( item ) : Buffer.from( JSON.stringify( item ) );

    return next( null, buffer );

  }

  return require( 'stream' ).Transform( {
    objectMode: true,
    transform
  } );

}

module.exports = createToBufferStream;
