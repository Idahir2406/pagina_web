import React from 'react'
import ProfileLayout from "components/profileLayout";

export default function Orders() {
  return (
    <div>

    </div>
  )
}


Orders.getLayout = function getLayout(page) {
  return  <ProfileLayout>{page}</ProfileLayout>
};
