export default interface UseCaseInterface<I, O> {
  
  exec(input: I): Promise<O>;
  
}