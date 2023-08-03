const input = [
  //dependency    //item
  ["t-shirt", "dress shirt"],
  ["dress shirt", "pants"],
  ["dress shirt", "suit jacket"],
  ["tie", "suit jacket"],
  ["pants", "suit jacket"],
  ["belt", "suit jacket"],
  ["suit jacket", "overcoat"],
  ["dress shirt", "tie"],
  ["suit jacket", "sun glasses"],
  ["sun glasses", "overcoat"],
  ["left sock", "pants"],
  ["pants", "belt"],
  ["suit jacket", "left shoe"],
  ["suit jacket", "right shoe"],
  ["left shoe", "overcoat"],
  ["right sock", "pants"],
  ["right shoe", "overcoat"],
  ["t-shirt", "suit jacket"],
];

const sortInput = (input) => {
  let clothes = {}, // hash: stringified id of the node => { id: id, afters: lisf of ids }
      sorted = [], // sorted list of IDs ( returned value )
      visited = {}; // hash: id of already visited node => true

  // `Node` will contain unique piece of clothing
  let Node = function(id) {
    this.id = id;
    this.afters = [];
  }

  // 1. build data structures
  // loop through the input
  // create a new `Node` for each `dependency` and `item`
  // add cloth `item` to respective cloth `dependency`
  input.forEach(([dependency, item]) => {
    if (!clothes[dependency]) {
      clothes[dependency] = new Node(dependency)
    };
    if (!clothes[item]) {
      clothes[item] = new Node(item)
    };

    clothes[dependency].afters
      .push(item);
  });

  // 2. topological sort
  Object.keys(clothes)
    .forEach(visit = (idString, ancestors) => {
    let node = clothes[idString],
        id = node.id;

    // if already exists, do nothing
    if (visited[idString]) {
      return
    };

    if (!Array.isArray(ancestors)) {
      ancestors = []
    };

    ancestors.push(id);

    visited[idString] = true;

    node.afters
      .forEach(function(afterID) {
        if (ancestors.indexOf(afterID) >= 0)  // if already in ancestors, a closed chain exists.
          throw new Error('closed chain : ' +  afterID + ' is in ' + id);

        visit(afterID.toString(),
        ancestors
          .map((v) => {
            return v
          })); // recursive call
      }
    );

    sorted.unshift(id);
  });

  return sorted.join(', ');
}
sortInput(input)
