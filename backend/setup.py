from setuptools import setup

setup(
    name='beergame',
    packages=['beergame'],
    include_package_data=True,
    install_requires=['flask','numpy','firebase_admin', 'flask_cors'],
    python_requires=">=3.5",
)
