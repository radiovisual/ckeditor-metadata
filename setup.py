# Always prefer setuptools over distutils
from setuptools import setup

setup (
    name='ckeditor-metadata',
    version='0.0.1',
    description='Manage metadata of selected CKEditor elements',
    author='Michael Wuergler',
    author_email='senjudev@gmail.com',
    url='https://github.com/radiovisual/ckeditor-metadata',
    long_description='This is a specialized plugin that allows you to add some metadata to selected CKEditor elements through a context menu. It works by managing separate data- attributes to the HTML element.',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: POSIX',
        'Programming Language :: JavaScript',
        'Topic :: Software Development :: Libraries',
    ],
    zip_safe=False
)