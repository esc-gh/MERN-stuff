const chai = require("chai");

const testPc = {
    name: "Roweena",
    race: "Human",
    class: "Bard",
    level: 11,
    spells: [
        {
            name: "Greater Invisibility",
            level: 4,
            school: "Illusion"
        },
        {
            name: "Message",
            level: 0,
            school: "Transmutation"
        }
    ],
    id: 1
}

describe("Chai Demo", function(){

    it("Expect", function(){
        chai.expect(testPc.name).to.equal("Roweena")
        chai.expect(testPc.race).to.equal("Human")
        chai.expect(testPc.class).to.equal("Bard")
        chai.expect(testPc.level).to.equal(11)
    })

    it("Property", function(){
        const testObject = {testPc};
        chai.expect(testObject).to.have.property("testPc")
        chai.expect(testObject.testPc).to.equal(testPc)
    })
})