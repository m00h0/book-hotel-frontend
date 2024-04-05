import More from '../../assets/more.jpg';

const more = () => (
  <div className="flex items-center">
    <div className="mr-5">
      <img className="rounded-2xl h-[20vh] w-[20vh]" src={More} alt="more" />
    </div>
    <div className="w-[48vw]">
      <h2 className="font-semibold text-2xl">
        Only best places
        <br />
        for your rest
      </h2>
      <p className="text-sm font-light text-slate-500">
        More than ten thousaand houses at your disposal.
        &nbsp;Only the best and checked landlords.
      </p>
    </div>
  </div>
);

export default more;
