#Programmed in Python 3.7 but with a few adjustments, can be run in other versions of Python 3
#The code does not do any rearrangememt or collection of like terms, so that has to be done yourself

'''This code's algorithm is based on the Matrix method of solving a system of linear equations'''

import numpy as np
from copy import deepcopy
import re


class VariableError(Exception): pass

class EqnSolver(object):
	def __init__(self, eqns:list, constants:list, ):
		self.eqns = eqns
		self.varCount = len(constants)
		self.constants = constants
		
	def solve(self):
		'''Solves the equation and returns the output as a list of values each corresponding to the variable letters in alphabetical order'''
		try:
			result = []
			bigDet = np.matrix(self.eqns)
			bigDet = np.linalg.det(bigDet)
			def getdet(n=0):
				'''gets the determinant of a submatrix of a matrix'''
				m = deepcopy(self.eqns)
				for i in range(self.varCount):
					m[i][n] = self.constants[i]
				return np.linalg.det(np.matrix(m))
				
			for i in range(self.varCount):
				d = getdet(i)
				result.append(round(d/bigDet, 5))
			return result
		except Exception as error:
			if type(error) == np.linalg.LinAlgError:
				return "Number of equations must be equal to the number of variables."
			else:
				return "Error!"


def split(expr) -> list:
	'''Splits an equation in a string and gets the constant and coefficients'''
	#First of all, i should get rid of whitespaces for convenience sake
	expr = expr.replace(" ", "")
	varPart = re.findall("[+-]*[0-9]*\.?[0-9]*[A-Za-z]", expr)
	if re.search("[A-Za-z][A-Za-z]", expr):
		return "Variable cluster found. Variables must be single"
	if re.search("\.\.", expr):
		return "Error, please remove double points"
	temp = expr
	for p in varPart:
		temp = temp.replace(p, "")
	temp = temp.replace("=","")
	eqindex = expr.index("=") if "=" in expr else 0
	constant = eval(temp) if expr.index(temp) > eqindex else -eval(temp)
	eqn = []
	variables = sorted([i for i in expr if i.isalpha()])
	for i in variables:
		for j in varPart:
			if i in j:
				coeff = j[:-1]
				if coeff == "":
					#If the constant comes before the equals sign, use -1 instead. This is because it changes sign when crossing over the equals sign
					coeff = coeff+"1"
					if expr.index(j) < eqindex: eqn.append(eval(coeff))
					else: eqn.append(-eval(coeff))
				elif re.fullmatch("[+-]+", coeff):
					coeff = coeff + "1"
					if expr.index(j) < eqindex: eqn.append(eval(coeff))
					else: eqn.append(-eval(coeff))
				else:
					if expr.index(j) < eqindex: eqn.append(eval(coeff))
					else: eqn.append(-eval(coeff))
	eqn.append(constant)
	return {'eqn':eqn, 'vars':variables}
	
def solveFromExpressions(exprlist):
	vars = [split(i)['eqn'][:-1] for i in exprlist] #gets the variables
	c = [split(i)['eqn'][-1] for i in exprlist] #gets the constants
	return EqnSolver(eqns=vars, constants=c).solve()
	
if __name__ == "__main__":
	m = [            #Equations for
		[1, 1, 1],   #x + y +z = 6
		[3, 1, -4],  #3x +y -4z = -7
		[1, 2, -1]   #x +2y -z = 2
		]
	s = EqnSolver(eqns=m, constants=[6, -7, 2])
	#print(s.solve())
	print()
	eqns = [
		"a+b+c-2d+w-x + y +z= 6",
		"a+3c-b-2d-4w+x + y -z = 12",
		"3a+2b-5c+4d-w+x - y +z= 14",
		"5a-2w-6d+14b-66c+x -y -z = 81",
		"5a-2w-6d+44b-66c+x -y -z = 41",
		"5a-2w-6d+14b-16c+x -y -z = 27",
		"5a-12w-6d+14b-66c+x -y -z = 21",
		"-2w+7a-6d+14b-66c+x -y -5z = 88",
	]
	#print(solveFromExpressions(eqns))
	print()
	print(split(eqns[1]))
	print()
	eqns =[
		"x +y = 3",
		"x - y = 1"]
	print(solveFromExpressions(eqns))