const jsonData = `{
    "person": {
      "name": "John Doe",
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "zipcode": "12345"
      },
      "contacts": [
        {
          "type": "email",
          "value": "john.doe@example.com"
        },
        {
          "type": "phone",
          "value": "+1234567890"
        }
      ]
    },
    "company": {
      "name": "ABC Corp",
      "employees": 500,
      "departments": ["IT", "Sales", "Finance"]
    }
  }`;
  
  interface Contact {
    type: string;
    value: string;
  }
  
  interface Person {
    name: string;
    age: number;
    address: {
      street: string;
      city: string;
      zipcode: string;
    };
    contacts: Contact[];
  }
  
  interface Data {
    person: Person;
    company: {
      name: string;
      employees: number;
      departments: string[];
    };
  }
  
  const data: Data = JSON.parse(jsonData);
  
  // Fetching the contact number
  let contactNumber: string | null = null;
  for (const contact of data.person.contacts) {
    if (contact.type === 'phone') {
      contactNumber = contact.value;
      break;
    }
  }
  
  console.log("Contact Number:", contactNumber);
  