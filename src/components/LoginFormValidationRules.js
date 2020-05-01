export default function validate(values) {
    let errors = {};
    if(!values.name){
      errors.name='The field must be filled in';     
    }
    if(!values.surName){
      errors.surName='The field must be filled in';     
    }
    if(!values.birthday){
      errors.birthday='The field must be filled in';     
    }
    if(!values.gender){
      errors.gender='The field must be filled in';     
    }
    if(!values.phone){
      errors.phone='The field must be filled in';     
    }
    else if(values.phone.length<12){
      errors.phone="phone must be like` +374 94******"
    }
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    if(!values.confirm){
      errors.confirm='The field must be filled in';     
    }
    else if(values.confirm.length!=values.password.length){
      errors.confirm="password and confirm fields must be the same"
    }
    return errors;
  };