import React from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { requireAuthentication } from "../utils/requireAuthentication";

const SecurePage = ({session}) => {
  return (
    <>
      <Head>
        <title>This is a private zone</title>
      </Head>
      <div>This is a private zone</div>
    </>
  );
};

export async function getServerSideProps(context){
    return requireAuthentication(context,({session} ) =>{
        return{
            props: {  session }
        }
    })
   

   
}
export default SecurePage;
