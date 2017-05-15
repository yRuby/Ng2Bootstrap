import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService{
    createDb(){
        let users=[
            {"id":"A001","name":"Ruby1","date":"12/12/2016"},
            {"id":"A002","name":"Ruby1","date":"12/14/2016"},
            {"id":"A003","name":"Ruby1","date":"12/15/2016"},
            {"id":"A004","name":"Ruby1","date":"12/16/2016"},
            {"id":"A005","name":"Ruby1","date":"12/17/2016"},
            {"id":"A006","name":"Ruby1","date":"12/18/2016"},
            {"id":"A007","name":"Ruby1","date":"12/19/2016"},
            {"id":"A008","name":"Ruby1","date":"12/12/2016"},
            {"id":"A009","name":"Ruby1","date":"12/13/2016"},
            {"id":"A010","name":"Ruby1","date":"12/14/2016"},
            {"id":"A011","name":"Ruby1","date":"12/12/2016"},
            {"id":"A012","name":"Ruby1","date":"12/13/2016"},
            {"id":"A013","name":"Ruby1","date":"12/16/2016"},
            {"id":"A014","name":"Ruby1","date":"12/17/2016"},
            {"id":"A015","name":"Ruby1","date":"12/18/2016"},
            {"id":"A016","name":"Ruby1","date":"12/19/2016"},
            {"id":"A017","name":"Ruby1","date":"12/13/2016"},
            {"id":"A018","name":"Ruby1","date":"12/13/2016"}
        ];
        return {users}
    }
}