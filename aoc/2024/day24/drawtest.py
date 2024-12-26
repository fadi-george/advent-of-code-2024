import graphviz
import fileinput


def parse_circuit(filename):
    # Dictionary to store variable values
    values = {}
    # List to store operations
    operations = []

    with open(filename, "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue

            if ":" in line:
                # Parse variable definition
                var, val = line.split(":")
                values[var.strip()] = int(val.strip())
            elif "->" in line:
                # Parse operation
                expr, result = line.split("->")
                operations.append((expr.strip(), result.strip()))

    return values, operations


def create_circuit_graph(values, operations):
    dot = graphviz.Digraph(comment="Logic Circuit")
    dot.attr(rankdir="LR")  # Set orientation to landscape (left to right)

    # Add input nodes
    for var, val in values.items():
        dot.node(var, f"{var}\n({val})")

    # Add operations and connections
    for op_expr, result in operations:
        # Parse operation
        parts = op_expr.split()

        if "AND" in parts:
            op_type = "AND"
            in1, _, in2 = parts
        elif "OR" in parts:
            op_type = "OR"
            in1, _, in2 = parts
        elif "XOR" in parts:
            op_type = "XOR"
            in1, _, in2 = parts

        # Create operation node
        op_node = f"{result}_op"
        dot.node(op_node, op_type, shape="box")

        # Connect inputs to operation
        dot.edge(in1, op_node)
        dot.edge(in2, op_node)

        # Connect operation to result
        dot.edge(op_node, result)

    return dot


# Usage
values, operations = parse_circuit("aoc/2024/day24/input.txt")
dot = create_circuit_graph(values, operations)
dot.render("draw/logic_circuit", view=True)
