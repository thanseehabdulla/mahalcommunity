export class API {

  public static API_ENDPOINT = 'http://localhost:4000';

  public static API_REGISTER = API.API_ENDPOINT + '/users';

  public static API_ACCESSTOKEN = API.API_ENDPOINT + '/oauth/token';

  public static API_ADDMAHAL = API.API_ENDPOINT + '/api/addmahal';

  public static API_ADDVARASANGYA = API.API_ENDPOINT + '/api/addvarasangya';

  public static API_ADDOTHERSANGYA = API.API_ENDPOINT + '/api/addothersangya';

  public static API_ADDMEMBER = API.API_ENDPOINT + '/api/addmember';

  public static API_GETMAHAL = API.API_ENDPOINT + '/api/getmahal/';

  public static API_GETMEMBERS = API.API_ENDPOINT + '/api/getmembers/';

  public static API_GETMEMBERSREG = API.API_ENDPOINT + '/api/getmembersreg/';

  public static API_UPDATEMAHAL = API.API_ENDPOINT + '/api/updatemahal/';

  public static API_UPDATEMEMBERS = API.API_ENDPOINT + '/api/updatemembers/';

  public static API_UPDATEMEMBERSSTATUS = API.API_ENDPOINT + '/api/updatemembersstatus/';

  public static API_UPDATEMEMBERSSTATUSVARASANGYA = API.API_ENDPOINT + '/api/updatemembersstatusvarasangya/';

  public static API_UPDATEMEMBERSSTATUSOTHERSANGYA = API.API_ENDPOINT + '/api/updatemembersstatusothersangya/';

  public static API_REMOVEMEMBERS = API.API_ENDPOINT + '/api/removemembers/';

  public static API_REMOVEMAHAL = API.API_ENDPOINT + '/api/removemahal/';

  public static API_UPDATEPASSWORD = API.API_ENDPOINT + '/api/updatepassword';
}
