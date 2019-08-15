import should from 'should';
import sinon from 'sinon';
import todosController from '../controllers/todosController';

describe('Todos Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty description todo', async () => {
      const Todo = { create() { } };

      const req = {
        body: {
          responsible: 'Adriano',
          priority: 'Medium',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = todosController(Todo);
      await controller.create(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Description is required').should.equal(true);
    });
  });
});
