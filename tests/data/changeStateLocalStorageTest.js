let storage = require("../../src/scripts/last_ver/data/changeStateLocalStorage");

describe('storage', () => {

    it('index <= -1', () => {
        expect(storage.changeStateLocalStorage(-1, "undone")).to.equal(false);
    });
    it('normal params', () => {
        expect(storage.changeStateLocalStorage(1, "undone")).to.equal(true);
    });
    it('mark is wrong', () =>{
        expect(storage.changeStateLocalStorage(2, "kjdfh")).to.equal(false);
    })
});