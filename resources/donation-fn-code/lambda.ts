import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { SERVICE_INIT_FAILED } from './donation-fn-code/constants/errors';
import { ERROR_PARSE_REQ_BODY, INVALID_EMAIL } from './donation-fn-code/constants/reqerrors';
import DBService from './donation-fn-code/database/DBService';
import { getNumberOfDonations } from './models/donations';
import isValidEmail from './donation-fn-code/utils/isValidEmail';

const initServices = async () => {
    console.log("Initialising services");
    const hasDBInitialised = await DBService.initialiseDb();
    return hasDBInitialised;
};

const parseRequestBody = (body: string) => {
    try {
        return JSON.parse(body);
    } catch (err) {
        console.error(ERROR_PARSE_REQ_BODY, err as Error);
        return {};
    }
}

const processError = (response:string, code?:number, err?:{message:string})=>{
    console.error(response, err?.message);
    return {
        statusCode: code ?? 400,
        body: JSON.stringify({
            error: response
        }),
    };
}


export const main = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    if(!await initServices()) {
        return processError(SERVICE_INIT_FAILED, 500);
    }

    const reqBody = parseRequestBody(event.body as string);
    const userEmail = reqBody.email;

    if(!userEmail || !isValidEmail(userEmail)) {
        return processError(INVALID_EMAIL, 400);
    }

    const donationCount = (await getNumberOfDonations(userEmail))?.count;
    
    if(donationCount && donationCount >= 2){
        //publish to sns
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            count:donationCount
        })
    };
};