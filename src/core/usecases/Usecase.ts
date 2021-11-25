export interface Usecase<Params, Response> {
    execute(request: Params): Response | Promise<Response>;
}