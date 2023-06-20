import React from 'react'
import ProfileLayout from "components/profileLayout";

export default function Addresses() {
  return (
    <div>addresses</div>
  )
}


Addresses.getLayout = function getLayout(page) {
  return  <ProfileLayout>{page}</ProfileLayout>
};
