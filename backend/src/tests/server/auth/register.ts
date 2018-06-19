import server from "../../../server/Api";
import chai, { should, expect } from "chai";
import { getConnection } from "typeorm";

import { User } from "../../../db/entities/User";
const connection = getConnection();

describe("/POST /api/v1/auth/register", () => {
  it("it should return 400 for an empty body", (done:any) => {
      chai.request(server.info.uri)
        .post("/api/v1/auth/register")
        .end((err:any, res:any) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
  });

  it("it should return 400 with a password that is shorter than 6 chars", (done:any) => {
      chai.request(server.info.uri)
        .post("/api/v1/auth/register")
        .send({
          name: "User Test",
          password: "1234"
        })
        .end((err:any, res:any) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
  });

  it("it should return 200 with a correct body", (done:any) => {
      chai.request(server.info.uri)
        .post("/api/v1/auth/register")
        .send({
          name: "User Test",
          password: "123456"
        })
        .end(async (err:any, res:any) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          const user = await connection.getRepository(User).findOne({username: "User Test"});
          expect(user).to.not.be.null;
          done();
        });
  });
});