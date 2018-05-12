class Recipe {
  _id:string;
  designation: string;
  type: string;
  capacity: number;
  source1:string;
  source2:string;

  constructor(
  ){
    this.designation = null
    this.type = null
    this.capacity = null
    this.source1 = null
    this.source2 = null
  }
}

export default Recipe;
