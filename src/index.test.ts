import { Loopy } from "./";

describe("Loopy", () => {
  it("creates an instance", () => {
    const inc = new Loopy([]);
    expect(inc).not.toBeNull();
  });

  it("it triggers onLoop and onLoopEnd", done => {
    const trigger = jest.fn();
    const inc = new Loopy({
      iterations: 10,
      onLoop: trigger,
      onLoopEnd() {
        expect(trigger).toHaveBeenCalledTimes(10);
        done();
      }
    });
    inc.start();
  });

  it("loops recursively through a list of loop options", done => {
    const total = jest.fn();
    const depth0 = jest.fn();
    const depth1 = jest.fn();
    const depth1End = jest.fn();
    const inc = new Loopy([
      {
        iterations: 5,
        onLoop(i) {
          total(i);
          depth0(i);
        },
        onLoopEnd() {
          expect(depth0).toHaveBeenCalledTimes(5);
          expect(depth1).toHaveBeenCalledTimes(50);
          expect(depth1End).toHaveBeenCalledTimes(5);
          expect(total).toHaveBeenCalledTimes(55);
          done();
        }
      },
      {
        iterations: 10,
        onLoop(i) {
          total(i);
          depth1(i);
        },
        onLoopEnd() {
          depth1End();
        }
      }
    ]);
    inc.start();
  });

  it("pauses and resumes looping", done => {
    const trigger = jest.fn();
    const inc = new Loopy({
      iterations: 50,
      delay: 100,
      onLoop(i) {
        trigger(i);
      }
    });

    inc.start();

    setTimeout(() => {
      inc.pause();
    }, 1000);

    setTimeout(() => {
      expect(trigger.mock.calls.length).toBeLessThan(12);
      inc.resume();
    }, 2000);

    setTimeout(() => {
      expect(trigger.mock.calls.length).toBeGreaterThan(11);
      done();
    }, 3000);
  });
});
