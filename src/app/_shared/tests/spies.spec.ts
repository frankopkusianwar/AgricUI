export const requestMock = jasmine.createSpyObj('RequestsService', [
  'post',
  'get',
  'patch',
  'delete',
  'put'
]);
export const httpMock = jasmine.createSpyObj('HttpClient', [
  'post',
  'get',
  'patch',
  'put',
  'delete'
]);
