import TABLES from "../constants/tables";
import DBService from "../database/DBService";

type GetNumberOfDonationsResult = {
    count?: number;
}

export const getNumberOfDonations = async (email: string):Promise<GetNumberOfDonationsResult | undefined> => {
    const db = DBService.getConnection();
    return await db(`${TABLES.DONATIONS} as d`)
        .join(`${TABLES.USER_DONATION_MAP} as u_d_map`, "d.id", "u_d_map.donation_id")
        .join(`${TABLES.USERS} as u`, "u.id", "u_d_map.user_id")
        .count("d.id as count")
        .where("u.email", email)
        .first();
}
