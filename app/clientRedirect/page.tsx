"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientRedirect() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [redirectEndpoint, setRedirectEndpoint] = useState<string| false>(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const RedirectEndpoint = localStorage.getItem('clientRedirect')
      if (RedirectEndpoint) {
        setRedirectEndpoint(RedirectEndpoint)
      }
    }
  })

  useEffect(() => {
    if (redirectEndpoint) {
      router.push(redirectEndpoint + '?' + searchParams.toString())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[redirectEndpoint])
  return (
    <>
      Redirecting  . . .
    </>
  );
}
