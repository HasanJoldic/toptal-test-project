import server from "../server/Api";

import chai, { should, expect } from "chai";
import chaiHttp from "chai-http";
const requireDir = require("require-dir");

chai.use(chaiHttp);

before(function(done) {
  this.timeout(6000);
  setTimeout(done, 5000);
})

describe("/GET users", () => {
  it("it should return 401 without auth header", (done:any) => {
      chai.request(server.info.uri)
        .get("/api/v1/users")
        .end((err:any, res:any) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
  });

  it("it should return 404 with nonexistent endpint", (done:any) => {
      chai.request(server.info.uri)
        .get("/nonexistent")
        .end((err:any, res:any) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
  });
});

requireDir("./server", { recurse: true });
