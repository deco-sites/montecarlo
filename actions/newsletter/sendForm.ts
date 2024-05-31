interface Props {
  name: string;
  email: string;
  phone?: string;
  dataCreate?: string;
}

const louder = async (Props: Props) => {
  const url =
    "https://rckmiddleware--montecarlo.myvtex.com/_v/register-leads-mkt-cloud";

  const leads = {
    "name": Props.name,
    "email": Props.email,
    "creation_date": Props.dataCreate,
    "page": "lead_newsletter",
  };

  const ras = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leads),
  }).then((res) => res.json());

  console.log(ras);

  return ras;
};

export default louder;
