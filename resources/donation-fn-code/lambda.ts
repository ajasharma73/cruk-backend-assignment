import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { ERROR_PUBLISHING_TO_SNS, SERVICE_INIT_FAILED } from './constants/errors';
import { DONATION_THANK_NOTE } from './constants/messages';
import { ERROR_PARSE_REQ_BODY, INVALID_EMAIL } from './constants/reqerrors';
import DBService from './database/db-service';
import { getNumberOfDonations } from './models/donations';
import isValidEmail from './utils/isValidEmail';
import publishToSNS from './utils/publishToSNS';
import util from 'util';

const initServices = async () => {
    console.log("Initialising services");
    const hasDBInitialised = await DBService.initialiseDb();
    return hasDBInitialised;
};

const parseRequestBody = (body: string) => {
    try {
        return JSON.parse(body);
    } catch (err) {
        return null;
    }
}

const processError = (response:string, code?:number, err?:{message:string})=>{
    console.error(response, JSON.stringify(err));
    return {
        statusCode: code ?? 500,
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
    if(!reqBody) return processError(ERROR_PARSE_REQ_BODY, 400);

    const userEmail = reqBody.email;

    if(!userEmail || !isValidEmail(userEmail)) {
        return processError(INVALID_EMAIL, 400);
    }

    const donationCount = (await getNumberOfDonations(userEmail))?.count;
    
    if(donationCount && donationCount >= 2){
        try{
            await publishToSNS(util.format(DONATION_THANK_NOTE,donationCount), userEmail, userEmail);
        } catch(err) {
            return processError(ERROR_PUBLISHING_TO_SNS, 500, err as Error);
        }
    }

    return {
        statusCode: 200,
        body: ''
    };
};