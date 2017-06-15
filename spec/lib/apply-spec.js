describe( 'ApplyStream instances', ()=>{

  const apply
    = require( process.cl_test_util.generateUITPath( __filename ) );

  const asyncify
    = require( 'async/asyncify' );

  const assert
    = require( 'assert' );

  it( 'should apply async functions to items piped in', ( done )=>{

    const expected = 1;

    let actual;

    const stream = apply( asyncify( Math.abs ) )
      .on( 'data', ( output )=>actual = output )
      .on( 'end', ()=>{

        expect( expected )
          .toEqual( actual );

        done();

      } );

    stream.write( -1 );
    stream.end();

  } );

  it( 'should emit errors emitted by the function', ( done )=>{

    const expected
      = new Error();

    const stream = apply(  ( _, next )=>next( expected )  )
      .on( 'error', ( err )=>{

        expect( err )
          .toBe( expected );

        done();

      } )
      .on( 'end', ()=>assert( false, 'should throw' ) );

    stream.write( -1 );
    stream.end();

  } );

} );