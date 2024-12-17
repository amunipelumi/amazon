import { priceFormat } from "../../scripts/utils/price.js";



describe('Test suite: priceFormat function', () => {
  it('formats cents to dollars', () => {
    const test_ = priceFormat(2550);
    const result_ = '25.50';
    // expect(test_).toBe(result_);
    expect(test_).toEqual(result_);
  });

  it('works with 0', () => {
    const test_ = priceFormat(0);
    const result_ = '0.00';
    expect(test_).toEqual(result_);
  });

  it('works for edge cases', () => {
    const test_ = priceFormat(2000.5);
    const result_ = '20.01';
    expect(test_).toEqual(result_);
  });
});
