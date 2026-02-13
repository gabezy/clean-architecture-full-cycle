import Customer from './customer';

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {

    expect(() => {
      new Customer("", "jonh");
    }).toThrow("customer: Id is required");
  })
})
