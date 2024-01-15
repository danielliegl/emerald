export class Requirement{
  constructor(name, isBoolean){
    this.name = name;
    this.values = [];
    this.isBoolean = isBoolean;
  }

  updateValue(user, value)
  {
    let found_value = this.values.find(x => x.user = user);
    if(!found_value)
    {
      this.values.push({user: user, value:value});
      return;
    }

    found_value.value = value;
    return;
  }

  updateName(new_name)
  {
    this.name = new_name;
  }
}
