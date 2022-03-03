import chai from 'chai'
let assert = chai.assert
import request from 'supertest'

// I want to test app.js, so I import it
import app from '../app.js'

describe('Static Server', function(){

    it('should return index.html if it is requested', async function(){
        const res = await request(app).get("/index.html")

        assert.equal(res.statusCode, 200)

        assert.include(
            res.text,
            '<script src="javascripts/index.js"></script>',
            "body has html code we recognize as from index.html"
        )
    })

    it('should return 404 for a non-existant file', async function(){
        const res = await request(app).get("/renvtnyvtrt4oiurwlij.html")

        assert.equal(res.statusCode, 404)
    })

})


